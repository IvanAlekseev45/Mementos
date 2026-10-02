interface User {
  name: string;
  age: number;
  isActive: boolean;
}

const users: User[] = [
  { name: 'Іван', age: 34, isActive: true },
  { name: 'Олена', age: 17, isActive: true },
  { name: 'Максим', age: 25, isActive: false },
  { name: 'Анна', age: 22, isActive: true },
  { name: 'Петро', age: 18, isActive: true },
  { name: 'Марія', age: 29, isActive: true },
];

const getActiveUserNames = (users: User[]) => {
  const activeUsersNames = users.filter(
    (user) => user.age > 18 && user.isActive,
  );
  activeUsersNames.sort((a, b) => {
    console.log('Порівнюємо:', a.name, b.name);
    return a.age - b.age;
  });

  return activeUsersNames.map((name) => name.name);
};

const a = getActiveUserNames(users);
console.log('\n========== DEBUG ==========');
console.log(a);
console.log('===========================\n');
