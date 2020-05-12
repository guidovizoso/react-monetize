export default function monetize({ amount, assetCode }) {
  const _amount = amount || '100';
  const _assetCode = assetCode || 'USD';
  const assetScale = '9';

  if (document.monetization) {
    const randomGuid = 'c7ff7da9-8a41-4660-98a8-ca4df0176fbe';

    const meta = document.querySelector('meta[name="monetization"]');
    let metaContent = null;
    if (meta) {
      metaContent = meta.getAttribute('content');
    }

    if (metaContent) {
      const resolvedEndpoint = metaContent.replace(/^\$/, 'https://');

      const monetizationstartEvent = new CustomEvent('monetizationstart', {
        detail: {
          requestId: randomGuid,
          id: randomGuid,
          metaContent,
          resolvedEndpoint,
        },
      });

      const monetizationprogressEvent = new CustomEvent(
        'monetizationprogress',
        {
          detail: {
            amount: _amount,
            assetCode: _assetCode,
            assetScale,
          },
        }
      );

      document.monetization.dispatchEvent(monetizationstartEvent);
      document.monetization.state = 'started';
      document.monetization.dispatchEvent(monetizationprogressEvent);
    } else {
      alert('monetization meta tag is not correctly configured.');
    }
  } else {
    alert(
      'for this bookmarklet to work, you must have the coil extension installed.'
    );
  }
}
