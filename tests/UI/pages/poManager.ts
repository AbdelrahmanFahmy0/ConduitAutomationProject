import { type Page } from '@playwright/test';
import { HomePage } from "./homePage";
import { RegisterPage } from "./registerPage";
import { LoginPage } from './loginPage';
import { SettingsPage } from './settingsPage';
import { ArticlePage } from './articlePage';
import { ManageArticlePage } from './manageArticlePage';
import { ProfilePage } from './profilePage';

export class PoManager {

    //=====================Variables====================
    private readonly page: Page;
    private readonly homePage: HomePage;
    private readonly registerPage: RegisterPage;
    private readonly loginPage: LoginPage;
    private readonly settingsPage: SettingsPage;
    private readonly manageArticlePage: ManageArticlePage;
    private readonly articlePage: ArticlePage;
    private readonly profilePage: ProfilePage;

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.registerPage = new RegisterPage(page);
        this.loginPage = new LoginPage(page);
        this.settingsPage = new SettingsPage(page);
        this.manageArticlePage = new ManageArticlePage(page);
        this.articlePage = new ArticlePage(page);
        this.profilePage = new ProfilePage(page);
    }

    //=====================Methods======================
    getHomePage() {
        return this.homePage;
    }

    getRegisterPage() {
        return this.registerPage;
    }

    getLoginPage() {
        return this.loginPage;
    }

    getSettingsPage() {
        return this.settingsPage;
    }

    getManageArticlePage() {
        return this.manageArticlePage;
    }

    getArticlePage() {
        return this.articlePage;
    }

    getProfilePage() {
        return this.profilePage;
    }
}