import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerUpdatedEvent from "./customer-updated.event";
import { SendConsoleLogWhenUpdateAddressHandler } from "./handler/sendConsoleLogWhenUpdateAddress.handle";

describe("Customer created event unit tests", () => {
    
    it("should register a customer updated address event", () => {
        const eventDispatcher = new EventDispatcher();

        const sendConsoleLogWhenUpdateAddressHandler = new SendConsoleLogWhenUpdateAddressHandler();

        eventDispatcher.register("CustomerUpdatedEvent", sendConsoleLogWhenUpdateAddressHandler);

        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(sendConsoleLogWhenUpdateAddressHandler);
    })

    it("Should unregister a customer updated address event", () => {
        const eventDispatcher = new EventDispatcher();

        const sendConsoleLogWhenUpdateAddressHandler = new SendConsoleLogWhenUpdateAddressHandler();

        eventDispatcher.register("CustomerUpdatedEvent", sendConsoleLogWhenUpdateAddressHandler);

        eventDispatcher.unregister("CustomerUpdatedEvent", sendConsoleLogWhenUpdateAddressHandler);

        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(0);
    })

    it("Should unregister all customer updated address event", () => {
        const eventDispatcher = new EventDispatcher();

        const sendConsoleLogWhenUpdateAddressHandler = new SendConsoleLogWhenUpdateAddressHandler();

        eventDispatcher.register("CustomerUpdatedEvent", sendConsoleLogWhenUpdateAddressHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeUndefined();

    })

    it("should notify all customer updated Address event", () => {
        const eventDispatcher = new EventDispatcher();

        const sendConsoleLogWhenUpdateAddressHandler = new SendConsoleLogWhenUpdateAddressHandler();

        eventDispatcher.register("CustomerUpdatedEvent", sendConsoleLogWhenUpdateAddressHandler);

        const spyEventHandler1 = jest.spyOn(sendConsoleLogWhenUpdateAddressHandler, 'handle');


        eventDispatcher.register("CustomerUpdatedEvent", sendConsoleLogWhenUpdateAddressHandler);

        const customerUpdatedEvent = new CustomerUpdatedEvent({
            id: "1",
            name: "Customer 2",
            address: {
                street: "Street 2",
                city: "City 2",
                number: 1,
                zip: "Zip 2"
            }
        })

        eventDispatcher.notify(customerUpdatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
    })

})