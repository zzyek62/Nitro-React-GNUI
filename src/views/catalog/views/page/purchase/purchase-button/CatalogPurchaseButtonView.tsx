import { CatalogPurchaseComposer } from 'nitro-renderer';
import { FC, useCallback, useEffect, useState } from 'react';
import { CatalogEvent } from '../../../../../../events';
import { useUiEvent } from '../../../../../../hooks/events/ui/ui-event';
import { SendMessageHook } from '../../../../../../hooks/messages/message-event';
import { LoadingSpinnerView } from '../../../../../../layout';
import { LocalizeText } from '../../../../../../utils/LocalizeText';
import { GetCurrencyAmount } from '../../../../../purse/utils/CurrencyHelper';
import { CatalogPurchaseButtonViewProps, CatalogPurchaseState } from './CatalogPurchaseButtonView.types';

export const CatalogPurchaseButtonView: FC<CatalogPurchaseButtonViewProps> = props =>
{
    const { className = '', offer = null, pageId = -1, extra = null, quantity = 1 } = props;
    const [ purchaseState, setPurchaseState ] = useState(CatalogPurchaseState.NONE);

    const onCatalogEvent = useCallback((event: CatalogEvent) =>
    {
        switch(event.type)
        {
            case CatalogEvent.PURCHASE_SUCCESS:
                setPurchaseState(CatalogPurchaseState.NONE);
                return;
            case CatalogEvent.SOLD_OUT:
                setPurchaseState(CatalogPurchaseState.SOLD_OUT);
                return;
        }
    }, []);

    useUiEvent(CatalogEvent.PURCHASE_SUCCESS, onCatalogEvent);
    useUiEvent(CatalogEvent.SOLD_OUT, onCatalogEvent);

    useEffect(() =>
    {
        setPurchaseState(CatalogPurchaseState.NONE);
    }, [ offer, quantity ]);

    const purchase = useCallback(() =>
    {
        setPurchaseState(CatalogPurchaseState.PURCHASE);

        SendMessageHook(new CatalogPurchaseComposer(pageId, offer.offerId, extra, quantity));
    }, [ pageId, offer, extra, quantity ]);

    const product = offer.products[0];

    if(product && product.uniqueLimitedItem && !product.uniqueLimitedItemsLeft)
    {
        return <button type="button" className={ 'btn btn-danger ' + className } disabled>{ LocalizeText('catalog.alert.limited_edition_sold_out.title') }</button>;
    }

    if((offer.priceCredits * quantity) > GetCurrencyAmount(-1))
    {
        return <button type="button" className={ 'btn btn-danger ' + className } disabled>{ LocalizeText('catalog.alert.notenough.title') }</button>;
    }

    if((offer.priceActivityPoints * quantity) > GetCurrencyAmount(offer.priceActivityPointsType))
    {
        return <button type="button" className={ 'btn btn-danger ' + className } disabled>{ LocalizeText('catalog.alert.notenough.activitypoints.title.' + offer.priceActivityPointsType) }</button>;
    }

    switch(purchaseState)
    {
        case CatalogPurchaseState.CONFIRM:
            return <button type="button" className={ 'btn btn-warning ' + className } onClick={ purchase }>{ LocalizeText('catalog.marketplace.confirm_title') }</button>;
        case CatalogPurchaseState.PURCHASE:
            return <button type="button" className={ 'btn btn-primary ' + className } disabled><LoadingSpinnerView /></button>;
        case CatalogPurchaseState.SOLD_OUT:
            return <button type="button" className={ 'btn btn-danger ' + className } disabled>{ LocalizeText('generic.failed') + ' - ' + LocalizeText('catalog.alert.limited_edition_sold_out.title') }</button>;
        case CatalogPurchaseState.NONE:
        default:
            return <button type="button" className={ 'btn btn-success ' + className } onClick={ event => setPurchaseState(CatalogPurchaseState.CONFIRM) }>{ LocalizeText('buy') }</button>
    }
}