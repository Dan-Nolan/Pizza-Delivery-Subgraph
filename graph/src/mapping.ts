import { Order, DeliveryStarted, DeliveryComplete } from "../generated/Pizza/Pizza"
import { Delivery, Deliverer } from "../generated/schema"
import { BigInt, log } from '@graphprotocol/graph-ts'

export function handleOrder(event: Order): void {
  let delivery = new Delivery(event.params.orderId.toString())

  delivery.numberOfPizzas = event.params.numberOfPizzas
  delivery.status = "Ordered"
  delivery.tip = BigInt.fromI32(0)

  delivery.save()
}

export function handleDeliveryStart(event: DeliveryStarted): void {
  let delivery = new Delivery(event.params.orderId.toString())

  delivery.status = "Started"
  delivery.deliverer = event.params.deliverer.toHex()
  delivery.eta = event.params.eta

  delivery.save()
}

export function handleDeliveryComplete(event: DeliveryComplete): void {
  let delivery = Delivery.load(event.params.orderId.toString())

  delivery.status = "Completed"
  delivery.tip = event.params.tip
  delivery.arrival = event.params.arrival

  let deliverer = Deliverer.load(delivery.deliverer)
  if(deliverer == null) {
    deliverer = new Deliverer(delivery.deliverer)
    deliverer.totalPizzas = BigInt.fromI32(0)
    deliverer.tips = BigInt.fromI32(0)
    deliverer.deliveries = BigInt.fromI32(0)
  }
  deliverer.totalPizzas += delivery.numberOfPizzas
  deliverer.tips += delivery.tip
  deliverer.deliveries += BigInt.fromI32(1)

  delivery.save()
  deliverer.save()
}
