import type { Arrayable } from '@antfu/utils'

export interface ProjectInfo {
  url: string
  folderName: string
  path: string
}

export interface ConfigGit {
  /** @default true */
  init?: boolean
  /** @default false */
  add?: boolean
}

export type ConfigReplaceFrom = Arrayable<string | RegExp>
export type ConfigReplaceFromCallback = (options: {
  file: string
  project: ProjectInfo
}) => ConfigReplaceFrom
export type ConfigReplaceTo = Arrayable<string>
export type ConfigReplaceToCallback = (options: {
  match: string
  file: String
  project: ProjectInfo
}) => ConfigReplaceTo

export interface ConfigReplace {
  include?: Arrayable<string>
  exclude?: Arrayable<string>
  from: ConfigReplaceFrom | ConfigReplaceFromCallback
  to: ConfigReplaceTo | ConfigReplaceToCallback
  /** @default true */
  all?: boolean
  /** @default false */
  ignoreCase?: boolean
}

export interface ConfigTemplate {
  name: string
  color?: string
  children?: ConfigTemplate[]
  url?: string

  git?: {
    /** @default true */
    init?: boolean
    /** @default false */
    add?: boolean
  }
  replaces?:
    | ({ items: Arrayable<Partial<ConfigReplace>> } & Partial<ConfigReplace>)
    | ConfigReplace[]

  /** @beta */
  commands?: Arrayable<string>
}

export interface Config extends Pick<ConfigTemplate, 'git' | 'replaces'> {
  templates?: Arrayable<ConfigTemplate>
}