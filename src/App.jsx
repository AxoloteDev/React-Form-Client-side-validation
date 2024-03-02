import { useState } from 'react'

import Text from './Text.jsx'
import reactLogo from './images/img.webp';

import './styles/App.css'

function Form(){
  const [name, setName] = useState("");
  const [nameVerificarion, setNameVerification] = useState(false);
  const [nameError, setNameError] = useState("");

  const [text, setText] = useState("");
  const [emailVerification, setEmailVerification] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);

  function handleNameValidation(e){
    let newText = e.target.value;
    setName(newText);

    nameValidation(newText);
  }

  function handleFormValidation(e){
    let newText = e.target.value;
    setText(newText);

    emailValidation(newText);
  }  

  function emailValidation(input){
    if(emailVerification){
      switch(true){
        case input.trim().length === 0:
          setEmailError(<div className='errorMsg'><img src='/src/images/x.webp'/><p>O campo não pode estar em branco</p></div>);
          break;
        case /\s/.test(input):
          setEmailError(<div className='errorMsg'><img src='/src/images/x.webp'/><p>Não pode conter espaços</p></div>);
          break;
        case !/@/.test(input):
          setEmailError(<div className='errorMsg'><img src='/src/images/x.webp'/><p>Precisa conter @</p></div>);
          break;
          case !/\./.test(input):
            setEmailError(<div className='errorMsg'><img src='/src/images/x.webp'/><p>Precisa conter .com ou semelhantes</p></div>);
            break;
        default:
          setEmailError(null);
          break;      
      }
    } else{
    setEmailError("");
    }
  }

  function nameValidation(input){
    if(nameVerificarion && input.trim().length === 0){
      console.log("Error no nome");
      setNameError(<div className='errorMsg'><img src='/src/images/x.webp'/><p>O campo não pode estar em branco</p></div>)
    } else{
      setNameError("");
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    nameValidation(name);
        
    if(name.trim().length === 0){
        setNameError(<div className='errorMsg'><img src='/src/images/x.webp'/><p>Preencha o campo novamente</p></div>);
    } else{
        submitForm();
    }
  }

  function submitForm(){
    if(!isSubmitting){
      setIsSubmitting(true);
      emailValidation(text);
      if(!emailError && text.trim().length > 0){
        console.log('Enviando...');
        setIsLoading(true);

        setTimeout(() => {
          console.log("Enviado");
          setIsSubmitting(false);
          setIsLoading(false);
          setIsSend(true);
        }, 3500);

      } else{
        console.log("Error");
        setEmailError(<div className='errorMsg'><img src='/src/images/x.webp'/><p>Preencha o campo corretamente</p></div>);
        setIsSubmitting(false);
        setIsLoading(false);
      }
    }
  }

  return(
    <>
    <form>
      <h2>Register</h2>
      <div>
        <label htmlFor="name" aria-hidden="true">Name</label>
        <input placeholder="Name" id="name" onChange={handleNameValidation} value={name} autoComplete='off' 
          className={nameError ? 'input-error' : 'input'} onFocus={() => {setNameVerification(true)}}
          onBlur={() => {setNameVerification(false)}} type='text'/>
        <p className='error'>{nameVerificarion && nameError}</p>
      </div>
      <div>
        <label htmlFor="e-mail" aria-hidden="true" autoComplete='off'>E-mail</label>
        <input placeholder="E-mail" id="e-mail"
          value={text} onChange={handleFormValidation}  className={emailError ? 'input-error' : 'input'} autoComplete='off'
          onFocus={() => {setEmailVerification(true)}} onBlur={() => {setEmailVerification(false)}} type='text'/>
        <p className='error'>{emailVerification && emailError}</p>
      </div>
      <div className='button'>
      <button onClick={handleSubmit} type="submit">Submit</button>
        <img style={{display: isLoading ? 'flex' : 'none'}} src='/src/images/loading.gif' alt='loading...'/>
      </div>
    </form>
    <div className={`modal ${isSend ? 'visible' : ''}`}>
      <div className='fade-in'>
        <img src={reactLogo} alt='React logo'/>
        <h1>God Job {name}</h1>
        <p>you will receive an email to {text}</p>
        <p style={{color: '#ffffff9a', fontSize: '0.8em'}}>(no email will be sent to {text} this is just a test)</p>
      </div>
    </div>
    </>
  )
}

function App() {
  return (
    <main>
      <Form></Form>
      <Text></Text>
    </main>
  )
}

export default App
