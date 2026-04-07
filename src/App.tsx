import { useState } from 'react'
import './App.css'
import { Input } from './components/Input/Input'
import { Button } from './components/Button/Button';
import { getPassword } from './components/Generate/generate';

function App() {

  const [masterKey, setMasterKey] = useState('');
  const [key, setKey] = useState('');
  const [tag, setTag] = useState('');
  const [password, setPassword] = useState('');

  const handleEditMasterKey = (value: string) =>
  {
    setMasterKey(value);
  }

  const handleEditKey = (value: string) =>
  {
    setKey(value);
  }

  const handleEditTag = (value: string) =>
  {
    setTag(value);
  }

  const generatePassword = async () =>
  {
    const pass = await getPassword(masterKey, key, tag);
    setPassword(pass);
  }

  const masterKeyError = masterKey.length > 0 && (masterKey.includes(' ') || masterKey.length < 6);
  const keyError = key.length > 0 && (key.includes(' ') || key.length < 2);

  return (
    <div className="bg-[#000000] min-h-screen w-full flex flex-col gap-12 justify-center p-8">
      <div className='w-full flex flex-col gap-6 justify-center'>
        <Input
          value={masterKey}
          onChange={handleEditMasterKey}
          placeholder='Master password*'
          type='password'
          rightAddon='visible'
          error={masterKeyError}
        />
        <Input
          value={key}
          onChange={handleEditKey}
          placeholder='Key*'
          error={keyError}
        />
        <Input
          value={tag}
          onChange={handleEditTag}
          placeholder='Tag'
        />
      </div>
      <Button onClick={generatePassword}>
        Generate
      </Button>

      <Input
        value={password}
        placeholder='Wait ur password'
        rightAddon='copy'
        disabled
        className=''
      />

      
    </div>
  )
}

export default App

