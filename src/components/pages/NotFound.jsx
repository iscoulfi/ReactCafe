import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1>Страница не найдена</h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует
      </p>
    </div>
  );
};

export default NotFound;
