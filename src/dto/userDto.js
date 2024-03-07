export default class UserDTO {
    constructor(user) {
      this.name = user.first_name
      this.surname = user.last_name
  }
}