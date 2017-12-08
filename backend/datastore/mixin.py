#File for all custom Mixins

from rest_framework import status
from backend.datastore import models
from django.http import HttpResponse

#Base cookie checker, used for abstraction otherwise not super useful
class CheckCookieMixin(object):

    def check_cookie(self, cookie):
        return True


def cookie_check_failed(self):
        return HttpResponse(status=status.HTTP_403_FORBIDDEN)

    def dispatch(self, request, *args, **kwargs):
        if not self.check_cookie(request.session['id']):
            return self.cookie_check_failed()
        else:
            return super(CheckCookieMixin, self).dispatch(request)

#useful mixin for checking the role of the user that just submitted
class RoleCookieRequiredMixin(CheckCookieMixin):
    role = None

    def check_cookie(self, cookie):
        if not models.Employees.check_employee_role_based_pin_hash(cookie, self.role):
            return self.cookie_check_failed()
        else:
            return True