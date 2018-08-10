package specs

import geb.error.RequiredPageContentNotPresent
import geb.spock.GebSpec
import pages.IndexPage
import util.CognitoClient
import util.TestUser
import util.Constants.*

class IndexSpec extends GebSpec {
    // Tests
    def "Has home links"() {
        // TODO go to some other arbitrary route
        when:
        to IndexPage
        topBar.logo.click()

        then:
        at IndexPage

        when:
        topBar.title.click()

        then:
        at IndexPage
    }

    def "Register modal should cancel"() {
        when:
        to IndexPage
        topBar.registerButton.click()

        then:
        validateRegisterModal(registerModal)

        when:
        registerModal.cancelButton.click()

        then:
        try {
            registerModal
            false
        } catch (RequiredPageContentNotPresent e) {
            true
        }
    }

    def "Register modal should register a user"() {
        when:
        to IndexPage
        topBar.registerButton.click()

        then:
        validateRegisterModal(registerModal)

        when:
        registerModal.userInfoForm.email.text = TestUser.email
        registerModal.userInfoForm.phone.text = TestUser.phone
        registerModal.userInfoForm.name.text = TestUser.name
        registerModal.userInfoForm.address.text = TestUser.address
        registerModal.userInfoForm.city.text = TestUser.city
        registerModal.userInfoForm.state.selected = TestUser.state
        registerModal.userInfoForm.zipCode.text = TestUser.zipCode
        registerModal.userInfoForm.password.value(TestUser.password)

        then:
        registerModal.userInfoForm.email.text == TestUser.email
        registerModal.userInfoForm.email.text == TestUser.email
        registerModal.userInfoForm.phone.text == TestUser.phone
        registerModal.userInfoForm.name.text == TestUser.name
        registerModal.userInfoForm.address.text == TestUser.address
        registerModal.userInfoForm.city.text == TestUser.city
        registerModal.userInfoForm.state.selected == TestUser.state
        registerModal.userInfoForm.zipCode.text == TestUser.zipCode
        registerModal.userInfoForm.password.value() == TestUser.password

//        when:
//        // We have to execute javascript here because of the popover's backdrop making
//        // submti button not clickable
//        js.exec("document.getElementById('login-window-submit').click();")
//        registerModal.submitButton.click()

//        then:
//        notification.isDisplayed()
//        notification.notificationContent.findElement($("notification-$notificationVariants.success-icon")).isDisplayed()

    }

    // Spock hooks
    def cleanupSpec() {
        CognitoClient.deleteTestUser()
    }

    // Helpers
    def validateRegisterModal(registerModal) {
        registerModal.isDisplayed()
        registerModal.title.isDisplayed()
        registerModal.title.text() == "Register"
    }
}