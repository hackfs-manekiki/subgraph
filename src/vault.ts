import { ByteArray, Bytes, ethereum } from '@graphprotocol/graph-ts'
import { AddAdmin, AddApprover, AddMember, ApprovalExecute, RemoveAdmin, RemoveApprover, RemoveMember, RequestApproval } from '../generated/templates/Vault/Vault'
import { Admin, Approver, Member, Request } from '../generated/schema'
import { store } from '@graphprotocol/graph-ts'

export function handleAddAdmin(event: AddAdmin): void {
    let id = `${event.address.toHexString()}-${event.params.admin.toHexString()}`
    let admin = Admin.load(id)
    if (!admin) {
        admin = new Admin(id)
    }
    admin.address = event.params.admin
    admin.name = event.params.name
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
    approver.name = event.params._approverName
    approver.budget = event.params.budget
    approver.vault = event.address
    approver.save()
}

export function handleRemoveApprover(event: RemoveApprover): void {
    let id = `${event.address.toHexString()}-${event.params.approver.toHexString()}`
    store.remove('Approver', id)
}

export function handleAddMember(event: AddMember): void {
    let id = `${event.address.toHexString()}-${event.params.member.toHexString()}`
    let member = Member.load(id)
    if (!member) {
        member = new Member(id)
    }
    member.address = event.params.member
    member.name = event.params.name
    member.vault = event.address
    member.save()
}

export function handleRemoveMember(event: RemoveMember): void {
    let id = `${event.address.toHexString()}-${event.params.member.toHexString()}`
    store.remove('Member', id)
}

export function handleNewRequest(event: RequestApproval): void {
    let id = `${event.address.toHexString()}-${event.params.requestId}`
    let request = Request.load(id)
    if (!request) {
        request = new Request(id)
    }
    let input = event.transaction.input
    request.requestId = event.params.requestId
    request.input = input
    request.requester = event.params.requester
    request.value = event.params.value
    request.budget = event.params.budget
    request.isExecuted = false
    request.vault = event.address
    request.createdTxhash = event.transaction.hash
    request.createdTimestamp = event.block.timestamp
    request.save()
}

export function handleExecuteRequest(event: ApprovalExecute): void {
    let id = `${event.address.toHexString()}-${event.params.requestId}`
    let request = Request.load(id)
    if (!request) {
        request = new Request(id)
    }
    request.requestId = event.params.requestId
    request.executor = event.params.executor
    request.isExecuted = true
    request.executedTxhash = event.transaction.hash
    request.executedTimestamp = event.block.timestamp
    request.save()
}
