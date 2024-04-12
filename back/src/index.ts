const App = require('@/app');
const ConnectDB = require('@/config/dbConfig');

const PORT: number = parseInt('3000', 10);

ConnectDB().then(() => {
  App.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });
});
