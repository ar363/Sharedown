/**
 * This file is part of the Sharedown (https://github.com/kylon/Sharedown).
 * Copyright (c) 2021 Kylon.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";

const basic = require('./Basic');
const simpleUniversity = require('./SimpleUniversity');

class LoginModule {
    // Sharedown UI module label
    #modules = [
        'Basic - Manual login',
        'University [Simple]'
    ];
    #active;

    constructor() {}

    getModuleList() {
        return this.#modules;
    }

    setLoginModule(idx) {
        switch (parseInt(idx, 10)) {
            case 1:
                this.#active = new simpleUniversity();
                break;
            default:
                this.#active = new basic.BasicLogin();
                break;
        }
    }

    getLoginModuleFields() {
        return this.#active?.getFields();
    }

    async doLogin(puppeteerPage, loginData) {
        await this.#active?.doLogin(puppeteerPage, loginData);
    }
}

module.exports = LoginModule;