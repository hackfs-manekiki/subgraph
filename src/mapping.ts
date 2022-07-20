import { VaultSetup } from '../generated/Manekiki/Factory'
import { Vault } from '../generated/schema'

export function handleNewVault(event: VaultSetup): void {
  let vault = new Vault(event.params.vault.toHex())
  vault.owner = event.params.owner
  vault.save()
}
