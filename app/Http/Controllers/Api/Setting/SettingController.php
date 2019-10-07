<?php


namespace App\Http\Controllers\Api\Setting;


use Illuminate\Http\Request;
use Spatie\Valuestore\Valuestore;

class SettingController
{

    public function get(Request $request)
    {
        $key = $request->input('key');

        if(!$this->isWhiteListed($key)){
            return [];
        }

        return [
            $key => $this->getStore()->get($key)
        ];
    }

    public function multiple(Request $request)
    {
        $store = $this->getStore();
        $keys = $this->getWhitelistedKeys($request);

        $response = [];

        foreach ($keys as $key){
            $response[$key] = $store->get($key);
        }

        return $response;
    }

    public function store(Request $request)
    {
        $store = $this->getStore();

        $keyValues = $this->getWhitelistedKeyValues($request);

        $store->put($keyValues);
    }

    protected function getWhitelistedKeyValues(Request $request): array
    {
        $keyValues = [];
        foreach ($request->all() as $key => $value) {
            if ($this->isWhiteListed($key)) {
                $keyValues[$key] = $value;
            }
        }

        return $keyValues;
    }

    protected function getWhitelistedKeys(Request $request): array
    {
        $keys = [];
        foreach ($request->input('keys', []) as $key) {
            if ($this->isWhiteListed($key)) {
                $keys[] = $key;
            }
        }

        return $keys;
    }

    protected function isWhiteListed($key): bool
    {
        return in_array($key, [
            'portalUrl',
            'backgroundColor',
            'responsibleUserId',
            'documentTemplateAgreementId',
            'emailTemplateAgreementId',
        ]);
    }

    protected function getStore(): Valuestore
    {
        return Valuestore::make(database_path('settings.json'));
    }
}