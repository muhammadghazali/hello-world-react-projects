import styles from './index.module.css';
import RichTextEditor from '../src/components/RichTextEditor';

export function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <RichTextEditor />
        </div>
      </div>
    </div>
  );
}

export default Index;
