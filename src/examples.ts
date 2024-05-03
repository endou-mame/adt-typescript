import { type Coproduct, type Individual, match } from "./adt-helper";

type User = Coproduct<{
  Member: { id: number; name: string; mail: string };
  Guest: { name: string };
  ThirdUser: { name: string; age: number };
}>;

type Member = Individual<User, "Member">; // { type: "Member"; id: number; name: string; mail: string }
type Guest = Individual<User, "Guest">; // { type: "Guest"; name: string }
type ThirdUser = Individual<User, "ThirdUser">; // { type: "ThirdUser"; name: string; age: number }

const alice: Member = {
  type: "Member",
  id: 1,
  name: "Alice",
  mail: "alice@mail.com",
};

const bob: Guest = {
  type: "Guest",
  name: "Bob",
};

const charlie: ThirdUser = {
  type: "ThirdUser",
  name: "Charlie",
  age: 20,
};

function showMessage(user: User) {
  return match(user)({
    Member: (member) => `こんにちは ${member.name} さん。あなたのメールアドレス: ${member.mail}`,
    Guest: (guest) => `こんにちは ${guest.name} さん。会員登録はいかがですか？`,
    ThirdUser: (thirdUser) => `こんにちは。${thirdUser.age}歳の${thirdUser.name}さんですね。`,
  });
}

console.log(showMessage(alice)); // こんにちは Alice さん。あなたのメールアドレス:
console.log(showMessage(bob)); // こんにちは Bob さん。会員登録はいかがですか？
console.log(showMessage(charlie)); // こんにちは。20歳のCharlieさんですね。
