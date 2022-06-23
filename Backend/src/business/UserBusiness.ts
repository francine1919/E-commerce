import { Authenticator } from "../services/Authenticator";
import { Idgenerator } from "../services/IdGenerator";
import { UserInputDTO } from "../model/User";
import moment from "moment";
import { UserDatabase } from "../data/UserDatabase";
import { verifyExpDate } from "../services/DateCheck";

const userDatabase = new UserDatabase();
const authenticator = new Authenticator();
const idGenerator = new Idgenerator();

export class UserBusiness {
  createUser = async (input: UserInputDTO): Promise<string> => {
    //validations
    const isRegisteredUser = await userDatabase.getUserByName(input.username);
    if (!input.username) {
      throw new Error("Nome inválido.");
    }

    if (!input.delivery_date) {
      throw new Error("Data inválida.");
    }

    if (isRegisteredUser) {
      throw new Error(
        "Este nome de usuário já está cadastrado, por favor digite um novo nome de usuário."
      );
    }
    //checking if the chosen date is in the future or current
    const newDateInput = moment(input.delivery_date, "YYYY-MM-DD").format(
      "DD-MM-YYYY"
    );

    const isDateInFutureOrCurrent = verifyExpDate(newDateInput);

    if (!isDateInFutureOrCurrent) {
      throw new Error("A data deve ser uma data no futuro.");
    }
    //generating id
    const id = idGenerator.generateId();

    //creating user
    await userDatabase.createUser(
      id,
      input.username,
      moment(input.delivery_date, "DD-MM-YYYY").format("YYYY-MM-DD")
    );

    //generating token
    const accessToken = authenticator.generateToken({
      id: id,
    });

    return accessToken;
  };
}
