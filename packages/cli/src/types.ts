export interface RegistryFile {
  path: string;
  type: string;
  content?: string;
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  author?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  docs?: string[];
  categories?: string[];
}
