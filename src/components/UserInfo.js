export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // RETURN USER INFO
  getUserInfo() {
    const userCurrentInfo = {};
    userCurrentInfo.name = this._nameElement.textContent;
    userCurrentInfo.description = this._descriptionElement.textContent;
    return userCurrentInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
