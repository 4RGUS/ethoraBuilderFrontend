import { useState } from 'react';
import { Poppins } from 'next/font/google'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import AppDetails from '@/app/components/AppDetails';
import AppMock from '@/app/components/AppMock/AppMock';
import { ActionStrip } from '@/app/components/ActionStrip';

//interfaces
export interface TCustomDetails {
  appTitle: string
  primaryColor: string
  secondaryColor: string
  coinSymbol: string
  coinName: string
  currentScreenIndex: number
  logo: File | null
  loginScreenBackground: File | null
  coinLogo: File | null
}

//font
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700', '900'] })


const screenSet = [{ screenName: "login", index: 0 }, { screenName: "profile", index: 1 }]
const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Home() {
  const [appTitle, setAppTitle] = useState<string>('');
  const [appName, setAppName] = useState<string>('');
  const [bundleId, setBundleId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);
  const [loginScreenBackground, setLoginScreenBackground] = useState<File | null>(null);
  const [primaryColor, setPrimaryColor] = useState<string>('');
  const [secondaryColor, setSecondaryColor] = useState<string>('');
  const [coinLogo, setCoinLogo] = useState<File | null>(null);
  const [coinSymbol, setCoinSymbol] = useState<string>('');
  const [coinName, setCoinName] = useState<string>('');
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false);
  const [appNameEmpty, setAppNameEmpty] = useState<boolean>(false);
  const [bundleIdEmpty, setBundleIdEmpty] = useState<boolean>(false);

  //handle to set logo file
  const handleLogoChange = (event: any) => {
    setAppTitle('')
    setLogo(event.target.files[0]);
  }

  //handle to set app title
  const handleAppTitle = (value: string) => {
    setLogo(null);
    setAppTitle(value);

  }

  const handleAppName = (value: string) => {
    setAppName(value);
    if (!value) {
      setAppNameEmpty(true);
    } else {
      setAppNameEmpty(false)
    }
  }

  const handleBundleId = (value: string) => {
    setBundleId(value);
    if (!value) {
      setBundleIdEmpty(true);
    } else {
      setBundleIdEmpty(false);
    }
  }

  //handle to set login screen background
  const handleLoginScreenBackgroundChange = (event: any) => {
    setLoginScreenBackground(event.target.files[0]);
  }

  //handle to set coin image
  const handleCoinLogoChange = (event: any) => {
    setCoinLogo(event.target.files[0]);
  }


  //handle for previous button in action strip
  const handlePrevClick = () => {
    setCurrentScreenIndex(currentScreenIndex - 1);
  }

  //handle for next button in action strip
  const handleNextClick = () => {
    setCurrentScreenIndex(currentScreenIndex + 1);
  }


  //handle email change
  const handleEmail = (value: any) => {

    setEmail(value);

    if (!value) {
      setEmailEmpty(true);
      setEmailInvalid(false);
    } else {
      setEmailEmpty(false);
      if (!value.match(emailValidRegex)) {
        setEmailInvalid(true);
      } else {
        setEmailInvalid(false);
      }
    }

  }

  //handle to clear data 
  const handleClear = (screenIndex: number) => {
    if (screenIndex === 0) {
      setAppName("")
      setAppTitle("");
      setLogo(null);
      setLoginScreenBackground(null);
      setEmail("");
      setBundleId("")
    }

    if (screenIndex === 1) {
      setPrimaryColor("");
      setSecondaryColor("");
      setCoinName("");
      setCoinSymbol("");
      setCoinLogo(null);
    }
  }



  //handle to submit data
  const handleSubmit = () => {

    //accepted data by the backend
    // appName - required
    // bundleId - required
    // email - required
    // appTitle
    // primaryColor
    // secondaryColor
    // coinSymbol
    // coinName
    // logoImage
    // loginScreenBackgroundImage
    // coinLogoImage

    if (!email) {
      setEmailEmpty(true);
    } else {
      setEmailEmpty(false);
    }

    if (!appName) {
      setAppNameEmpty(true)
    } else {
      setAppNameEmpty(false);
    }

    if (!bundleId) {
      setBundleIdEmpty(true);
    } else {
      setBundleIdEmpty(false)
    }

    if (email && appTitle && bundleId) {
      if (email.match(emailValidRegex)) {
        const data = new FormData();
        data.append('appTitle', appTitle);
        data.append('bundleId', bundleId);
        data.append('appName', appName);
        data.append('email', email);
        data.append('primaryColor', primaryColor);
        data.append('secondaryColor', secondaryColor);
        data.append('coinSymbol', coinSymbol);
        data.append('coinName', coinName);
        data.append('coinLogoImage', coinLogo as Blob);
        data.append('logoImage', logo as Blob);
        data.append('loginScreenBackgroundImage', loginScreenBackground as Blob);
        console.log(data.forEach(value => {
          console.log(value);
        }))

        const requestOptions = {
          method: 'POST',
          body: data
        };
        fetch("http://localhost:3001/buildapp", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      } else {
        setEmailInvalid(true);
      }
    }

  }

  return (
    <main className={poppins.className}>
      <Head>
        <title>Ethora Cloud</title>
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <AppDetails
            appName={appName}
            appTitle={appTitle}
            bundleId={bundleId}
            email={email}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            coinSymbol={coinSymbol}
            coinName={coinName}
            setAppName={handleAppName}
            setAppTitle={handleAppTitle}
            setBundleId={handleBundleId}
            setEmail={handleEmail}
            handleLogoChange={handleLogoChange}
            handleLoginScreenBackgroundChange={handleLoginScreenBackgroundChange}
            setPrimaryColor={setPrimaryColor}
            setSecondaryColor={setSecondaryColor}
            handleCoinLogoChange={handleCoinLogoChange}
            setCoinSymbol={setCoinSymbol}
            setCoinName={setCoinName}
            currentScreenIndex={currentScreenIndex}
            logo={logo}
            loginScreenBackground={loginScreenBackground}
            coinLogo={coinLogo}
            handleClear={handleClear}
            emailEmpty={emailEmpty}
            emailInvalid={emailInvalid}
            appNameEmpty={appNameEmpty}
            bundleIdEmpty={bundleIdEmpty}
          />
          <AppMock
            appTitle={appTitle}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            logo={logo}
            loginScreenBackground={loginScreenBackground}
            coinLogo={coinLogo}
            coinSymbol={coinSymbol}
            coinName={coinName}
            currentScreenIndex={currentScreenIndex}
          />
        </div>

        <ActionStrip
          currentScreenIndex={currentScreenIndex}
          screenSet={screenSet}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  )
}