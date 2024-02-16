// @ts-nocheck
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { experiment } from './index';
import {
  TypeDemoPageSkeleton
} from './shared/types';
import { useTranslateAmpExperimentContentfulEntry } from './hooks/useResolvedAmpExperimentEntry';

function App() {
  const [output, setOutput] = useState('');
  const [blogHeader, setBlogHeader] = useState('');
  const [plainText, setPlainText] = useState('');
  const entry = useTranslateAmpExperimentContentfulEntry<TypeDemoPageSkeleton>(
    '4Ma2bjfUyIaf71crnJnW6O',
  );

  useEffect(() => {
    const getData = async () => {
      await experiment.fetch({
        user_id: 'heather.lee@amplitude.com',
        device_id: 'abc123',
        user_properties: { premium: true },
      });
    }
    getData();
  }, []);

  useEffect(() => {
    if (entry) {
      if (entry.fields.header) setBlogHeader(entry.fields.header as string);
      if (entry.fields.cta.fields?.resolvedVariation) {
          setOutput(entry.fields.cta.fields?.resolvedVariation.fields.text as string);
      }
      if (entry.fields.plainTextVariant.fields?.resolvedVariation) {
          setPlainText(entry.fields.plainTextVariant.fields?.resolvedVariation.fields.testField as string);
      }
    }
  }, [entry]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{blogHeader}</h2>
        <button>{output}</button>
        <p>{plainText}</p>
      </header>
    </div>
  );
}

export default App;
