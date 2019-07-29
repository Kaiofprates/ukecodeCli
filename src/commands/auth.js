module.exports = {
    name: 'auth',
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
          
          firebase.auth().createUserWithEmailAndPassword(email,senha).then(user=>{
              print.success(firebase.auth().currentUser.email)
          }).catch(err =>{
              print.error(err)
          })

      }else {
          print.error('Faltam parametros!')
      }
    }
  }
  