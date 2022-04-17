import { NgModule } from "@angular/core";

import {
    TUI_SANITIZER,
    TuiActiveZoneModule,
    TuiAutoFocusModule,
    TuiElementModule,
    TuiFilterPipeModule,
    TuiLetModule,
    TuiMapperPipeModule,
    TuiMediaModule,
} from '@taiga-ui/cdk';
import {
    iconsPathFactory,
    TUI_ICONS_PATH,
    TuiButtonModule,
    TuiCalendarModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiDropdownControllerModule,
    TuiDropdownModule,
    TuiErrorModule,
    TuiExpandModule,
    TuiFormatNumberPipeModule,
    TuiFormatPhonePipeModule,
    TuiGroupModule,
    TuiHintControllerModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiLabelModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiManualHintModule,
    TuiModeModule,
    TuiNotificationModule,
    TuiNotificationsModule,
    TuiPointerHintModule,
    TuiPrimitiveCheckboxModule,
    TuiPrimitiveTextfieldModule,
    TuiRootModule,
    TuiScrollbarModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiTooltipModule,
} from '@taiga-ui/core';
import {
    TuiAccordionModule,
    TuiActionModule,
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiBadgeModule,
    TuiBreadcrumbsModule,
    TuiCalendarMonthModule,
    TuiCalendarRangeModule,
    TuiCheckboxBlockModule,
    TuiCheckboxLabeledModule,
    TuiCheckboxModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiDropdownContextModule,
    TuiDropdownSelectionModule,
    TuiFieldErrorModule,
    TuiFilterByInputPipeModule,
    TuiFilterModule,
    TuiHighlightModule,
    TuiInputCopyModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputDateTimeModule,
    TuiInputFileModule,
    TuiInputInlineModule,
    TuiInputModule,
    TuiInputMonthModule,
    TuiInputMonthRangeModule,
    TuiInputNumberModule,
    TuiInputPasswordModule,
    TuiInputPhoneInternationalModule,
    TuiInputPhoneModule,
    TuiInputRangeModule,
    TuiInputSliderModule,
    TuiInputTagModule,
    TuiInputTimeModule,
    TuiIslandModule,
    TuiLazyLoadingModule,
    TuiLineClampModule,
    TuiMarkerIconModule,
    TuiMultiSelectModule,
    TuiPaginationModule,
    TuiPresentModule,
    TuiProgressModule,
    TuiProjectClassModule,
    TuiRadioBlockModule,
    TuiRadioLabeledModule,
    TuiRadioListModule,
    TuiRadioModule,
    TuiSelectModule,
    TuiSliderModule,
    TuiStepperModule,
    TuiTabsModule,
    TuiTagModule,
    TuiTextAreaModule,
    TuiToggleModule,
    TuiRatingModule,
    TuiTreeModule,
} from '@taiga-ui/kit';
import {
    TuiAxesModule,
    TuiBarModule,
    TuiBarChartModule,
    TuiLineChartModule,
    TuiLineDaysChartModule,
    TuiPieChartModule,
    TuiRingChartModule
} from '@taiga-ui/addon-charts';
import {
    TuiCardModule,
    TuiInputCardModule,
    TuiInputCVCModule,
    TuiCurrencyPipeModule,
    TuiInputExpireModule,
    TuiMoneyModule,
} from '@taiga-ui/addon-commerce';
import { TuiColorPickerModule, TuiInputColorModule, TuiEditorModule, TuiEditorSocketModule } from '@taiga-ui/addon-editor';
import {
    TuiElasticStickyModule,
    TuiMobileCalendarModule,
    TuiMobileDialogModule,
    TuiPullToRefreshModule,
    TuiRippleModule,
    TuiSidebarModule,
    TuiTouchableModule,
} from '@taiga-ui/addon-mobile';
import {
    TuiReorderModule,
    TuiResizableColumnModule,
    TuiTablePaginationModule,
    TuiTableModule,
} from '@taiga-ui/addon-table';

import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { ReceiptServiceService } from "./services/receipt-service.service";
import { SummaryCalculateService } from "./services/summary-calculate-service.service";

const tuiModules = [
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
    // // Modules for your app modules where you use our components
    TuiAccordionModule,
    TuiActionModule,
    TuiActiveZoneModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiCalendarRangeModule,
    TuiCalendarMonthModule,
    TuiCardModule,
    TuiAxesModule,
    TuiLineChartModule,
    TuiLineDaysChartModule,
    TuiPieChartModule,
    TuiBarChartModule,
    TuiRingChartModule,
    TuiCheckboxModule,
    TuiCheckboxBlockModule,
    TuiCheckboxLabeledModule,
    TuiPrimitiveCheckboxModule,
    TuiColorPickerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiDropdownContextModule,
    TuiHostedDropdownModule,
    TuiErrorModule,
    TuiEditorModule,
    TuiEditorSocketModule,
    TuiExpandModule,
    TuiFieldErrorModule,
    TuiFilterModule,
    TuiGroupModule,
    TuiMarkerIconModule,
    TuiInputInlineModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputCardModule,
    TuiInputColorModule,
    TuiInputCVCModule,
    TuiInputExpireModule,
    TuiInputCopyModule,
    TuiInputCountModule,
    TuiInputDateTimeModule,
    TuiInputFileModule,
    TuiInputMonthModule,
    TuiInputMonthRangeModule,
    TuiInputNumberModule,
    TuiInputPasswordModule,
    TuiInputPhoneModule,
    TuiInputRangeModule,
    TuiInputDateRangeModule,
    TuiInputSliderModule,
    TuiInputTagModule,
    TuiInputTimeModule,
    TuiInputPhoneInternationalModule,
    TuiPrimitiveTextfieldModule,
    TuiTextAreaModule,
    TuiIslandModule,
    TuiLabelModule,
    TuiLineClampModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiMoneyModule,
    TuiNotificationModule,
    TuiMobileDialogModule,
    TuiMobileCalendarModule,
    TuiPullToRefreshModule,
    TuiRadioModule,
    TuiRadioBlockModule,
    TuiRadioLabeledModule,
    TuiRadioListModule,
    TuiComboBoxModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiScrollbarModule,
    TuiInputRangeModule,
    TuiInputSliderModule,
    TuiSliderModule,
    TuiSvgModule,
    TuiReorderModule,
    TuiResizableColumnModule,
    TuiTablePaginationModule,
    TuiTagModule,
    TuiToggleModule,
    TuiTooltipModule,
    TuiBreadcrumbsModule,
    TuiPaginationModule,
    TuiStepperModule,
    TuiTabsModule,
    TuiAutoFocusModule,
    TuiDropdownModule,
    TuiDropdownSelectionModule,
    TuiElasticStickyModule,
    TuiElementModule,
    TuiHighlightModule,
    TuiHintModule,
    TuiLazyLoadingModule,
    TuiManualHintModule,
    TuiPointerHintModule,
    TuiLetModule,
    TuiMediaModule,
    TuiModeModule,
    TuiPresentModule,
    TuiProgressModule,
    TuiRippleModule,
    TuiSidebarModule,
    TuiDropdownControllerModule,
    TuiTouchableModule,
    TuiHintControllerModule,
    TuiTextfieldControllerModule,
    TuiMoneyModule,
    PolymorpheusModule,
    TuiFilterPipeModule,
    TuiFormatNumberPipeModule,
    TuiFormatPhonePipeModule,
    TuiMapperPipeModule,
    TuiTableModule,
    TuiBarModule,
    TuiCurrencyPipeModule,
    TuiProjectClassModule,
    TuiRatingModule,
    TuiFilterByInputPipeModule,
    TuiTreeModule,
]

@NgModule({
    declarations: [
    ],
    imports: [
        ...tuiModules,
    ],
    providers: [
        ReceiptServiceService,
        SummaryCalculateService
    ],
    exports: [
        ...tuiModules,
    ],
})
export class TuiModule { }