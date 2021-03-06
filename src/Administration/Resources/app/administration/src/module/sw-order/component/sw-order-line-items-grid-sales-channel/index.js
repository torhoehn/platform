import template from './sw-order-line-items-grid-sales-channel.html.twig';
import './sw-order-line-items-grid-sales-channel.scss';

const { Component, Utils: { get }, State, Service } = Shopware;

Component.register('sw-order-line-items-grid-sales-channel', {
    template,

    inject: ['repositoryFactory'],

    props: {
        cart: {
            type: Object,
            required: true
        },

        currency: {
            type: Object,
            required: true
        },

        isCustomerActive: {
            type: Boolean,
            default: false
        },

        isLoading: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            selectedItems: {},
            searchTerm: ''
        };
    },

    computed: {
        orderLineItemRepository() {
            return this.repositoryFactory.create('order_line_item');
        },

        cartLineItems() {
            return this.cart.lineItems.filter(item => (item.label || '').toLowerCase().includes(this.searchTerm));
        },

        lineItemTypes() {
            return Service('cartSalesChannelService').getLineItemTypes();
        },

        getLineItemColumns() {
            const columnDefinitions = [{
                property: 'label',
                dataIndex: 'label',
                label: this.$tc('sw-order.createBase.columnProductName'),
                allowResize: false,
                primary: true,
                inlineEdit: true,
                width: '200px'
            }, {
                property: 'unitPrice',
                dataIndex: 'unitPrice',
                label: get(this.cart, 'price.taxStatus') === 'net' ?
                    this.$tc('sw-order.createBase.columnPriceNet') :
                    this.$tc('sw-order.createBase.columnPriceGross'),
                allowResize: false,
                align: 'right',
                inlineEdit: true,
                width: '120px'
            }, {
                property: 'quantity',
                dataIndex: 'quantity',
                label: this.$tc('sw-order.createBase.columnQuantity'),
                allowResize: false,
                align: 'right',
                inlineEdit: true,
                width: '80px'
            }, {
                property: 'totalPrice',
                dataIndex: 'totalPrice',
                label: get(this.cart, 'price.taxStatus') === 'net' ?
                    this.$tc('sw-order.createBase.columnTotalPriceNet') :
                    this.$tc('sw-order.createBase.columnTotalPriceGross'),
                allowResize: false,
                align: 'right',
                width: '80px'
            }, {
                property: 'tax',
                label: this.$tc('sw-order.createBase.columnTax'),
                allowResize: false,
                align: 'right',
                inlineEdit: true,
                width: '100px'
            }];

            return columnDefinitions;
        }
    },

    methods: {
        onInlineEditSave(item) {
            if (item._isNew && item.type === '') {
                item.type = this.lineItemTypes.PRODUCT;
            }

            this.$emit('on-save-item', item);
        },

        onInlineEditCancel(item) {
            if (item._isNew) {
                this.initLineItem(item);
                delete item.identifier;
            }
        },

        createNewOrderLineItem() {
            this.searchTerm = '';
            this.$refs.itemFilter.term = '';

            const item = this.orderLineItemRepository.create();
            item.versionId = Shopware.Context.api.liveVersionId;
            this.initLineItem(item);

            return item;
        },

        initLineItem(item) {
            item.priceDefinition = {
                isCalculated: false,
                taxRules: [{ taxRate: 0, percentage: 100 }],
                price: 0
            };
            item.price = {
                taxRules: [{ taxRate: 0 }],
                unitPrice: 0,
                quantity: 1,
                totalPrice: 0
            };
            item.quantity = 1;
            item.unitPrice = 0;
            item.totalPrice = 0;
            item.precision = 2;
            item.label = '';
        },

        onInsertExistingItem() {
            const item = this.createNewOrderLineItem();
            item.type = '';
            this.cartLineItems.unshift(item);
            State.commit('swOrder/setCartLineItems', this.cartLineItems);
        },

        onInsertBlankItem() {
            const item = this.createNewOrderLineItem();
            item.description = 'custom line item';
            item.type = this.lineItemTypes.CUSTOM;
            this.cartLineItems.unshift(item);
            State.commit('swOrder/setCartLineItems', this.cartLineItems);
        },

        onInsertCreditItem() {
            const item = this.createNewOrderLineItem();
            item.description = 'credit line item';
            item.type = this.lineItemTypes.CREDIT;
            this.cartLineItems.unshift(item);
            State.commit('swOrder/setCartLineItems', this.cartLineItems);
        },

        onSelectionChanged(selection) {
            this.selectedItems = selection;
        },

        onDeleteSelectedItems() {
            const selectedIds = [];

            Object.keys(this.selectedItems).forEach(key => {
                if (this.selectedItems[key].label === '') {
                    State.commit('swOrder/removeEmptyLineItem', key);
                } else {
                    selectedIds.push(key);
                }
            });

            if (selectedIds.length > 0) {
                this.$emit('on-remove-items', selectedIds);
            }
        },

        itemCreatedFromProduct(id) {
            const item = this.cartLineItems.find((elem) => { return elem.id === id; });
            return !!item._isNew && item.type === '';
        },

        onSearchTermChange(searchTerm) {
            this.searchTerm = searchTerm.toLowerCase();
        },

        isCreditItem(item) {
            return item.type === this.lineItemTypes.CREDIT;
        },

        isProductItem(item) {
            return item.type === this.lineItemTypes.PRODUCT;
        },

        getMinItemPrice(item) {
            if (this.isCreditItem(item)) {
                return null;
            }
            return 0;
        },

        getMaxItemPrice(item) {
            if (this.isCreditItem(item)) {
                return 0;
            }
            return null;
        },

        isNotPromotion(item) {
            return item.type !== 'promotion';
        },

        isNotAutoPromotion(item) {
            if (!this.isNotPromotion(item)) {
                if (item.payload.code === '') {
                    return false;
                }
            }
            return true;
        }
    }
});
