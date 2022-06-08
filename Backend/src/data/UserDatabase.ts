import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "user";

  public async createUser(
    id: string,
    username: string,
    delivery_date: Date | string
  ): Promise<void> {
    try {
      await this.connection(UserDatabase.TABLE_NAME)
        .insert({
          id,
          username,
          delivery_date,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (err: any) {
      console.log(err.sqlMessage || err.message);
      throw new Error(err.sqlMessage || err.message);
    }
  }
  public async getUserByName(username: string) {
    try {
      const result = await this.connection(UserDatabase.TABLE_NAME)
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ username: username });
      return result[0] && User.toUserModel(result[0]);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
  //   public async getAllTeams(): Promise<Team[]> {
  //     try {
  //       const allTeamsData = await this.connection(
  //         TeamDatabase.TABLE_NAME
  //       ).select("*");
  //       return allTeamsData.map((team) => Team.toTeamModel(team));
  //     } catch (err: any) {
  //       throw new Error(err.sqlMessage || err.message);
  //     }
  //   }
}
