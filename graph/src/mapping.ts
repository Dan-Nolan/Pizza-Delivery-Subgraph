import { Order, DeliveryStarted, DeliveryComplete } from "../generated/Pizza/Pizza"
import { Delivery, Deliverer } from "../generated/schema"

export function handleOrder(event: Order): void {
  let delivery = new Delivery(event.params.orderId.toString())

  delivery.numberOfPizzas = event.params.numberOfPizzas
  delivery.status = "Ordered"

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
  let delivery = new Delivery(event.params.orderId.toString())

  delivery.status = "Completed"
  delivery.tip = event.params.tip
  delivery.arrival = event.params.arrival

  let deliverer = new Deliverer(delivery.deliverer)
  if(deliverer.totalPizzas === null) {
    deliverer.totalPizzas = 0;
  }
  if(deliverer.tips === null) {
    deliverer.tips = 0;
  }
  deliverer.totalPizzas += delivery.numberOfPizzas;
  deliverer.tips += delivery.tip;

  delivery.save()
  deliverer.save()
}
