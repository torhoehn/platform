CHANGELOG for 6.2.x
===================

This changelog references the relevant changes (bug and security fixes) done
in 6.2 minor versions.

To get the diff for a specific change, go to https://github.com/shopware/platform/commit/XXX where XXX is the change hash
To get the diff between two versions, go to https://github.com/shopware/platform/compare/v6.2.0-rc4...v6.2.0

### 6.2.0

**Addition / Changes**

* Core

    * Deprecated `\Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextWithHtmlField`, use `\Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField` with `AllowHtml` flag instead
* Administration
	* Added `disabled` attribute of fields to `sw-customer-address-form` component
    * Deprecated `tagStore` in `sw-newsletter-recipient-list`
    * Refactored `sw-newsletter-recipient-list`, it now uses `repositoryFactory` instead of `StateDeprecated` for
    fetching and editing data
        * Removed LocalStore
        * Removed StateDeprecated
        * Removed Computed salesChannelStore
        * Removed Computed tagStore
        * Removed Computed tagAssociationStore
    * Moved `sw-manufacturer`, it now uses `repositoryFactory` instead of `StateDeprecated` for 
    fetching and editing data
        * Deprecated `mediaStore`
        * Added `mediaRepository`
        * Deprecated `customFieldSetStore`
        * Added `customFieldSetRepository`
        * Deprecated import of `StateDeprecated`
        * Rewritten `loadEntityData` so it uses the new data handling
        * Added `customFieldSetCriteria` as an computed property
    * Added `disabled` attribute of fields to `sw-customer-address-form` component
    * Refactored sw-radio-field
        * Deprecated currentValue, use value instead
        * Deprecated watcher for value
    * Added "Cache & Indexes" Module to system settings

    *
    * The component sw-integration-list was refactored to use the "repositoryFactory" instead of "StateDeprecated" to fetch and save data
	    - deprecated "StateDeprecated"
	    - change default data "integrations" from "[]" to "null"
	    - deprecated computed "id"
	    - deprecated computed "integrationStore"
	    - deprecated block "sw_integration_list_grid_inner"
	    - deprecated block "sw_integration_list_grid_inner_slot_columns"
	    - deprecated block "sw_integration_list_grid_pagination"
    * Deprecated the use of `fixed-top` class in `header-minimal.html.twig`
    * The component sw-plugin-box was refactored to use the "repositoryFactory" instead of "StateDeprecated" to fetch and save data
            - removed "StateDeprecated"
            - removed computed "pluginStore"
    * The component sw-settings-payment-detail was refactored to use the "repositoryFactory" instead of "StateDeprecated" to fetch and save data
        - removed "StateDeprecated"
        - removed computed "paymentMethodStore"
        - removed computed "ruleStore"
        - removed computed "mediaStore"
    * `sw-settings-custom-field-set`
	    - Removed method which overrides the mixin method `getList`
	    - Add computed property `listingCriteria`
    * `sw-settings-document-list`
        - Removed method which overrides the mixin method `getList`
        - Add computed property `listingCriteria`
    * Refactor  `sw-settings-snippet-list`
        - Remove `StateDeprecated`
        - Remove computed property `snippetSetStore`
        - Add computed property `snippetSetRepository`
        - Add computed property `snippetSetCriteria`
    * Refactor `sw-settings-snippet-set-list`
        - Remove `StateDeprecated`
        - Remove computed property `snippetSetStore`
        - Add computed property `snippetSetRepository`
        - Add computed property `snippetSetCriteria`
        - The method `onConfirmClone` is now an asynchronous method
    * Refactor mixin `sw-settings-list.mixin`
        - Remove `StateDeprecated`
        - Remove computed property `store`
        - Add computed property `entityRepository`
        - Add computed property `listingCriteria`
    * Refactor the module `sw-settings-number-range-detail`
        * Remove LocalStore
        * Remove StateDeprecated
        * Remove data typeCriteria
        * Remove data numberRangeSalesChannelsStore
        * Remove data numberRangeSalesChannels
        * Remove data numberRangeSalesChannelsAssoc
        * Remove data salesChannelsTypeCriteria
        * Remove computed numberRangeStore
        * Remove computed firstSalesChannel
        * Remove computed salesChannelAssociationStore
        * Remove computed numberRangeStateStore
        * Remove computed salesChannelStore
        * Remove computed numberRangeTypeStore
        * Remove method onChange
        * Remove method showOption
        * Remove method getPossibleSalesChannels
        * Remove method setSalesChannelCriteria
        * Remove method enrichAssocStores
        * Remove method onChangeSalesChannel
        * Remove method configHasSaleschannel
        * Remove method selectHasSaleschannel
        * Remove method undeleteSaleschannel
    * Added a new component `sw-order-line-items-grid-sales-channel` which can be used to display line items list in create order page
     * Fixed disabled click event of `router-link` in `sw-context-menu-item`
        - Add `event` and `target` attribute to `<router-link>` to handle with `disabled` prop
        - Add `target` prop to set target options for `<router-link>`
    * Added block `sw_sales_channel_detail_content_tab_analytics` to `sw-sales-channel-detail`, which contains the new Google Analytics tab

    * Added property `isRecordEditable` and `isRecordselectable` to `sw-data-grid`
* Core    
    * The `Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter` no longer supports `||` and `&&`.
    * The usage of `entity` in the `shopware.entity.definition` tag is deprecated and will be removed with 6.4. 
    * Added `novelty` rule builder condition-type
    * Added `SalesChannelAnalyticsEntity` to define the Google Analytics configuration

* Storefront	
    * The `theme.json` now supports a new option for the `style` files. The placeholder `@StorefrontBootstrap` gives you the ability to use the Bootstrap SCSS without the Shopware Storefront "skin":
        ```json
        {
             "style": [
                  "@StorefrontBootstrap",
                  "app/storefront/src/scss/base.scss"
             ]
        }
         ```
        * The `@StorefrontBootstrap` placeholder also includes the SCSS variables from your `theme.json`.
        * Please beware that this option is only available for the `style` section.
        * You can only use either `@StorefrontBootstrap` or `@Storefront`. They should not be used at the same time. The `@Storefront` bundle includes the Bootstrap SCSS already.

**Removals**

* Administration
    *

* Core
    *    

* Storefront
    *	
* Core
    * Added hreflang support
