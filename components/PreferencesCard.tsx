import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconCircle } from "./IconCircle"

export function PreferencesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 rounded-md border border-neutral-200 p-3">
          <IconCircle>
            <div className="h-4 w-4 rounded-full bg-neutral-300" />
          </IconCircle>
          <div className="flex-1">
            <div className="font-medium text-neutral-900">System Preferences</div>
            <div className="text-sm text-neutral-500">Lorem ipsum dolor sit amet</div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
