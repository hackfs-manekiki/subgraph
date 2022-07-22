import { Address } from '@graphprotocol/graph-ts'
import { AddAdmin, AddApprover, RemoveAdmin, RemoveApprover, RequestApproval } from '../generated/templates/Vault/Vault'
import { Admin, Approver, Request } from '../generated/schema'
import { store } from '@graphprotocol/graph-ts'

export function handleAddAdmin(event: AddAdmin): void {
    let id = `${event.address.toHexString()}-${event.params.admin.toHexString()}`
    let admin = Admin.load(id)
    if (!admin) {
        admin = new Admin(id)
    }
    admin.address = event.params.admin
    admin.vault = event.address
    admin.save()
}

export function handleRemoveAdmin(event: RemoveAdmin): void {
    let id = `${event.address.toHexString()}-${event.params.admin.toHexString()}`
    store.remove('Admin', id)
}

export function handleAddApprover(event: AddApprover): void {
    let id = `${event.address.toHexString()}-${event.params.approver.toHexString()}`
    let approver = Approver.load(id)
    if (!approver) {
        approver = new Approver(id)
    }
    approver.address = event.params.approver
    approver.budget = event.params.budget
    approver.vault = event.address
    approver.save()
}

export function handleRemoveApprover(event: RemoveApprover): void {
    let id = `${event.address.toHexString()}-${event.params.approver.toHexString()}`
    store.remove('Approver', id)
}

export function handleNewRequest(event: RequestApproval): void {
    let id = `${event.address.toHexString()}-${event.params.requestId}`
    let request = Request.load(id)
    if (!request) {
        request = new Request(id)
    }
    request.requestId = event.params.requestId
    request.requestType = 'TRANSFER'
    request.data = event.transaction.input
    request.requester = event.params.requester
    request.value = event.params.value
    request.budget = event.params.budget
    request.isExecuted = false
    request.vault = event.address
    request.save()
}