module.exports = {
    name: 'login',
    run: async toolbox => {
        const { print,parameters } = toolbox
        if(parameters.options.e && parameters.options.s){
            const email = parameters.options.e
            const senha = parameters.options.s
  
            print.success(`
            email = ${email}
            senha = ${senha} 
            `)
            var firebase = require('firebase');
            var credenciais = require('../../keys/credentials.js')

            // Initialize Firebase
            firebase.initializeApp(credenciais.firebaseConfig);
            
            firebase.auth().signInWithEmailAndPassword(email,senha).then(user=>{
                var Storage = require('node-storage');
                var store = new Storage('./db');

                var acesso = new Date(firebase.auth().currentUser.metadata.lastSignInTime)
                var uid = firebase.auth().currentUser.uid
                
                store.put('acesso', acesso.getTime())
                store.put('uid' , uid);
                store.put('email', email); 

                console.log(acesso.getTime() + ' : ' + uid)

               

            }).catch(err =>{
                print.error(err)
            })
  
        }else {
            print.error('Faltam parametros!')
        }
      }
    }
  
  