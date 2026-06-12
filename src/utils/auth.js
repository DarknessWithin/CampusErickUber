export const getCustomer =
    () =>
        JSON.parse(
            localStorage.getItem(
                "customer"
            )
        );

export const getDriver =
    () =>
        JSON.parse(
            localStorage.getItem(
                "driver"
            )
        );