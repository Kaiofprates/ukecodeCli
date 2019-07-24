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
                print.success(firebase.auth().currentUser.metadata)
            }).catch(err =>{
                print.error(err)
            })
  
        }else {
            print.error('Faltam parametros!')
        }
      }
    }
  
  