module.exports = {
    name: 'chat',
    run: async toolbox => {
      const { print,parameters } = toolbox


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

        try{

        var firebase = require('firebase');
        var credenciais = require('../../keys/credentials.js')
        firebase.initializeApp(credenciais.firebaseConfig);
        const data = firebase.database().ref('data/')

        if(parameters.options.m){
            const hora = Date(Date.now()).split(' ')[4]
            const email = store.get('email')

            const message = {
                feed : `
                ${hora} ---------- ${email}
                ${parameters.options.m}
                ` 
            }
            data.set(message,e =>{
                if(e){
                    print.error("erro--------- " + e)
                }
            })

        } else {
            print.error(`
            Por favor digite uma mensagem!
            `)
        }
        }catch(err){
        
            print.error(err)

        }





      }




    }
  }
  