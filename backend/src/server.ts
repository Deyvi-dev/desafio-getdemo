import { app}  from './app';
import sequelize from './config/database';
import { getErrorMessage } from './utils/errorHandler';

const PORT = 3001;

const init = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${getErrorMessage(error)}`);
    process.exit(1);
  }
};

init();
