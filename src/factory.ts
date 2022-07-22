import { VaultSetup } from '../generated/Factory/Factory'
import { Vault } from '../generated/schema'
import { Vault as VaultContract } from '../generated/templates'

export function handleNewVault(event: VaultSetup): void {
  let vault = Vault.load(event.params.vault)
  if (!vault) {
    vault = new Vault(event.params.vault)
  }
  vault.owner = event.params.owner
  vault.name = event.params.name
  vault.save()
  VaultContract.create(event.params.vault)
}
