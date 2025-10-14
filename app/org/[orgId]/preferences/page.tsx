"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export default function PreferencesPage() {
  const [settings, setSettings] = useState({
    allowExternalUsers: true,
    requireMFA: false,
    sessionTimeout: "8",
    defaultRole: "Viewer",
    notificationEmail: "admin@commonspirit.org",
    dataRetention: "7",
    auditLogging: true,
    ipRestrictions: false,
  })

  const handleSave = () => {
    // Save logic would go here
    console.log("Saving preferences:", settings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Organization Preferences</h1>
              <p className="text-neutral-600">Configure organization-wide settings and policies</p>
            </div>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-neutral-700">Allow External Users</label>
                <p className="text-xs text-neutral-500">Allow users from outside the organization</p>
              </div>
              <Switch
                checked={settings.allowExternalUsers}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowExternalUsers: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-neutral-700">Require Multi-Factor Authentication</label>
                <p className="text-xs text-neutral-500">Force all users to enable MFA</p>
              </div>
              <Switch
                checked={settings.requireMFA}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireMFA: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-neutral-700">IP Restrictions</label>
                <p className="text-xs text-neutral-500">Limit access to specific IP ranges</p>
              </div>
              <Switch
                checked={settings.ipRestrictions}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, ipRestrictions: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-neutral-700">Audit Logging</label>
                <p className="text-xs text-neutral-500">Log all user actions for compliance</p>
              </div>
              <Switch
                checked={settings.auditLogging}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, auditLogging: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-neutral-700">Session Timeout</label>
              <p className="text-xs text-neutral-500 mb-2">Hours before automatic logout</p>
              <Select
                value={settings.sessionTimeout}
                onValueChange={(value) =>
                  setSettings({ ...settings, sessionTimeout: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">Default Role</label>
              <p className="text-xs text-neutral-500 mb-2">Role assigned to new members</p>
              <Select
                value={settings.defaultRole}
                onValueChange={(value) =>
                  setSettings({ ...settings, defaultRole: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">Data Retention Period</label>
              <p className="text-xs text-neutral-500 mb-2">How long to keep audit logs</p>
              <Select
                value={settings.dataRetention}
                onValueChange={(value) =>
                  setSettings({ ...settings, dataRetention: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-neutral-700">Notification Email</label>
              <p className="text-xs text-neutral-500 mb-2">Email address for system notifications</p>
              <Input
                value={settings.notificationEmail}
                onChange={(e) =>
                  setSettings({ ...settings, notificationEmail: e.target.value })
                }
                placeholder="admin@commonspirit.org"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-neutral-700">Email Notifications</label>
                  <p className="text-xs text-neutral-500">Send email alerts for important events</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-neutral-700">Weekly Reports</label>
                  <p className="text-xs text-neutral-500">Send weekly usage and activity reports</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-neutral-700">Security Alerts</label>
                  <p className="text-xs text-neutral-500">Immediate alerts for security events</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neutral-500">Organization ID:</span>
                <span className="ml-2 font-mono text-neutral-900">commonspirit</span>
              </div>
              <div>
                <span className="text-neutral-500">Created:</span>
                <span className="ml-2 text-neutral-900">January 15, 2024</span>
              </div>
              <div>
                <span className="text-neutral-500">Last Updated:</span>
                <span className="ml-2 text-neutral-900">March 22, 2024</span>
              </div>
              <div>
                <span className="text-neutral-500">Status:</span>
                <span className="ml-2 px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                  Active
                </span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Product Access</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Clear Contracts</span>
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Analyze</span>
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
