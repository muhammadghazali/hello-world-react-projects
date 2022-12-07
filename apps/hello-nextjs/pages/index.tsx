import styles from './index.module.css';
import dynamic from 'next/dynamic';

const DynamicRichTextEditor = dynamic(
  () => import('../src/components/RichTextEditor'),
  {
    ssr: false,
  }
);

export function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <DynamicRichTextEditor />
        </div>
      </div>
    </div>
  );
}

export default Index;
