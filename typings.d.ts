declare module "copy-webpack-plugin";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Window {
  api: {
    fetchUsers: () => Promise<User[]>;
  };
}
