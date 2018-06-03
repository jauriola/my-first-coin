App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 1000000000000000,
  tokensSold: 0,
  tokensAvailable: 750000,

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3 !== 'undefinded'){
      // If a web3 instance is already provided by Meta Mask
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    }else{
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  initContracts: function() {
    // Read out build files
    $.getJSON("AvilaTokenSale.json", function(avilaTokenSale) {
     App.contracts.AvilaTokenSale = TruffleContract(avilaTokenSale);
     App.contracts.AvilaTokenSale.setProvider(App.web3Provider);
     App.contracts.AvilaTokenSale.deployed().then(function(avilaTokenSale) {
       console.log("Avila Token Sale Address:", avilaTokenSale.address);
     });
   }).done(function() {
     $.getJSON("AvilaToken.json", function(avilaToken) {
       App.contracts.AvilaToken = TruffleContract(avilaToken);
       App.contracts.AvilaToken.setProvider(App.web3Provider);
       App.contracts.AvilaToken.deployed().then(function(avilaToken) {
         console.log("Avila Token Address:", avilaToken.address);
       });

       App.listenForEvents();
       return App.render();
     });
   })
  },

  listenForEvents: function(){
    App.contracts.AvilaTokenSale.deployed().then(function(instance){
      instance.Sell({},{
        fromBlock: 0,
        toBlock: 'latest',
      }).watch(function(error, event){
        console.log("event triggered", event);
        App.render();
      })
    })
  },

  render: function() {
    if(App.loading){
      return;
    }
    App.loading = true;

    var loader = $('#loader');
    var content = $('#content');

    loader.show();
    content.hide();
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#account-address').html("Your Account: " + account);
      }
    })

    // Load token sale contract
    App.contracts.AvilaTokenSale.deployed().then(function(instance){
      avilaTokenSaleInstance = instance;
      return avilaTokenSaleInstance.tokenPrice();
    }).then(function(tokenPrice){
      App.tokenPrice = tokenPrice;
      console.log('tokenPrice', tokenPrice.toNumber());
      $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
      return avilaTokenSaleInstance.tokensSold();
    }).then(function(tokensSold){
      //App.tokensSold = tokensSold.toNumber();
      App.tokensSold = tokensSold.toNumber();
      $('.tokens-sold').html(App.tokensSold);
      $('.tokens-available').html(App.tokensAvailable);

      var progressPercent = (App.tokensSold / App.tokensAvailable) * 100;
      $('#progress').css('width', progressPercent + '%');

      // Load token contract
      App.contracts.AvilaToken.deployed().then(function(instance) {
        avilaTokenInstance = instance;
        return avilaTokenInstance.balanceOf(App.account);
      }).then(function(balance) {
        $('.avila-balance').html(balance.toNumber());
        App.loading = false;
        loader.hide();
        content.show();
      })
    });
  },

  buyTokens: function() {
    $('#content').hide();
    $('#loader').show();
    var numberOfToken = $('#numberOfToken').val();
    console.log('Number of tokens', numberOfToken);
    App.contracts.AvilaTokenSale.deployed().then(function(instance){
      return instance.buyTokens(numberOfToken, {
        from: App.account,
        value: numberOfToken * App.tokenPrice,
        gas: 500000 // Gas limit
      });
    }).then(function(result){
        console.log("Tokens bought...");
        $('form').trigger('reset'); // reset number of tokens in form
        // Wait for event to be triggered (Sell event)
        //$('#content').show();
        //$('#loader').hide();
    });
  }
}

$(function() {
  $(window).load(function() {
    //When the window loads our app is initialized
    App.init();
  })
})
