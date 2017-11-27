<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $permissions = [
            'create_person',
            'view_person',
            'update_person',
            'delete_person',
            'create_account',
            'view_account',
            'update_account',
            'delete_account',
            'update_contact_iban',
            'update_contact_owner',
            'manage_group',
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->insert([
                    'name' => $permission,
                    'guard_name' => 'api',
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permissions', function (Blueprint $table) {
            //
        });
    }
}
