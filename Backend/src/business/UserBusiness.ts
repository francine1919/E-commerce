import { Authenticator } from "../services/Authenticator";
import { Idgenerator } from "../services/IdGenerator";
import { UserInputDTO } from "../model/User";
import moment from "moment";
import { UserDatabase } from "../data/UserDatabase";

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

  //   login = async (input: LoginInputDTO) => {
  //     const userFromDB = await responsibleDatabase.findUserByEmail(input.email);

  //     const hashCompare = await hashManager.compare(
  //       input.password,
  //       userFromDB.password
  //     );

  //     const accessToken = authenticator.generateToken({
  //       id: userFromDB.id,
  //       role: userFromDB.role,
  //     });

  //     if (!hashCompare) {
  //       throw new Error("Senha inválida!");
  //     }

  //     return accessToken;
  //   };

  //   editRole = async (
  //     input: RoleInputDTO,
  //     tokenHeaders: string
  //   ): Promise<string> => {
  //     try {
  //       const { id, role } = input;

  //       if (!id || !role) {
  //         throw new Error("Esse endpoint requer um id e role como req.params .");
  //       }

  //       if (!tokenHeaders) {
  //         throw new Error(
  //           "Esse endpoint requer um token no headers authorization."
  //         );
  //       }

  //       const tokenData = authenticator.getTokenData(tokenHeaders);

  //       if (tokenData.role !== "ADMIN") {
  //         throw new Error("Somente ADMIN podem editar um role.");
  //       }

  //       const accessToken = authenticator.generateToken({
  //         id: id,
  //         role: role,
  //       });

  //       await responsibleDatabase.editRole(id, role);

  //       return accessToken;
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     }
  //   };

  //   async getAllResponsibles(
  //     token_headers: string
  //   ): Promise<Responsibles[] | undefined> {
  //     try {
  //       if (!token_headers) {
  //         throw new Error(
  //           "Esse endpoint requer um token no headers authorization."
  //         );
  //       }

  //       const authenticator = new Authenticator();
  //       const tokenData = authenticator.getTokenData(token_headers);

  //       const responsiblesDatabase = new ResponsibleDatabase();
  //       const responsibles = await responsiblesDatabase.getAllResponsibles();
  //       if (!responsibles) {
  //         throw new Error("Ocorreu um erro, por favor tente novamente.");
  //       }
  //       return responsibles;
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     }
  //   }
}
