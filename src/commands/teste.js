module.exports = {
    name: 'teste',
    run: async toolbox => {
      const { print } = toolbox

      var Storage = require('node-storage');
      var store = new Storage('./db');
      var acesso = store.get('acesso')

      var agora = Date.now()
      var tempo_de_uso = ((agora - acesso) / 60000).toFixed()
      print.info(tempo_de_uso)
      if( tempo_de_uso > 30 ){
          print.error(`
          tempo expirado!
          Por favor, log-se novamente!
          `
          )
      }else{
        // ---------------- comandos-----------------
        var colors = require('colors');

        try{
          // Initialize Firebase
          var firebase = require('firebase');
          var credenciais = require('../../keys/credentials.js')
          firebase.initializeApp(credenciais.firebaseConfig);

          const data = firebase.database().ref('data/feed')
          console.log(`${Date(Date.now()).split(' ')[4]} --------  ${store.get('email')}`.inverse )
          data.on("value", (resp) => {
            console.log(`
            [--------------------------------------------------------]
            |  ${resp.val()}                                         
            [--------------------------------------------------------]

            `.magenta)
          
          
          })


        }catch(err){
          print.error(err)
        }

        
      }

    }
  }
  

