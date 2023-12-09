import { AwilixContainer } from 'awilix'

/**
 * 
 * @param container The container in which the registrations are made
 * @param config The options of the plugin or the entire config object
 */
export default (container: AwilixContainer, config: Record<string, unknown>): void | Promise<void> => {
  container.resolve('faceService');
}