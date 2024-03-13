import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export class SendConsoleLogWhenUpdateAddressHandler implements EventHandlerInterface<CustomerUpdatedEvent> {
    handle(event: CustomerUpdatedEvent) {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.toString()}`);
    }
}