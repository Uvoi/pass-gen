import { useRef, useState } from 'react'
import './App.css'
import { Input } from './components/Input/Input'
import { Button } from './components/Button/Button';
import { getPassword } from './components/Generate/generate';
import { Eye, X } from 'lucide-react';
import { defaultSettings, SettingsModal } from './components/Modal/SettingsModal';
import type { GenerateSettings } from './components/Modal/SettingsModal';

function App() {

  const [masterKey, setMasterKey] = useState('');
  const [key, setKey] = useState('');
  const [tag, setTag] = useState('');
  const [password, setPassword] = useState('');
  const [settings, setSettings] = useState<GenerateSettings>(defaultSettings);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generatePassword = async () =>
  {
    if (masterKeyError || keyError || !masterKey || !key) {
      const msg = !masterKey || !key ? 'Fill fields' : 'Fix errors first';
      setErrorMsg(msg);
      if (errorTimer.current) clearTimeout(errorTimer.current);
      errorTimer.current = setTimeout(() => setErrorMsg(''), 5_000);
      return;
    }
    setLoading(true);
    const pass = await getPassword(masterKey, key, tag, settings);
    setLoading(false);
    setErrorMsg('');
    if (errorTimer.current) clearTimeout(errorTimer.current);
    setPassword(pass);
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setPassword(''), 30_000);
  }

  const masterKeyError = masterKey.length > 0 && (masterKey.includes(' ') || masterKey.length < 6);
  const keyError = key.length > 0 && (key.includes(' ') || key.length < 2);

  const handleReset = () =>
  {
    setMasterKey('');
    setKey('');
    setTag('');
    setPassword('');
  }


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

      <div className='flex gap-2 w-full'>
        <Button onClick={handleReset} className='w-fit bg-gray-600'>
          <X height={30} width={30}/>
        </Button>
        <Button onClick={generatePassword} className='w-full'>
          {loading ? <Eye height={30} width={30} className='animate-spin' /> : errorMsg || 'Generate'}
        </Button>
        <SettingsModal settings={settings} onChange={setSettings} />
      </div>

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
