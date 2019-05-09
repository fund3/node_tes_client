class BatchOrdersParams {
    constructor({ orders }) {
        /**
         * @param orders: (Array[PlaceSingleOrderParams])
        */
        this.orders = orders
    }
}

export default BatchOrdersParams;
