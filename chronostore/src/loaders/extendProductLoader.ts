import { AwilixContainer } from 'awilix'

/**
 * 
 * @param container The container in which the registrations are made
 * @param config The options of the plugin or the entire config object
 */
export default async (container: AwilixContainer, config: Record<string, unknown>): Promise<void> => {
    const imports = (await import(
        "@medusajs/medusa/dist/api/routes/store/customers/index"
      )) as any;
      imports.allowedStoreCustomersFields = [
        ...imports.allowedStoreCustomersFields,
        "skybioUid",
      ]
      imports.defaultStoreCustomersFields = [
        ...imports.defaultStoreCustomersFields,
        "skybioUid",
      ]
    
}