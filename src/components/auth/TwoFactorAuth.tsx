
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export const TwoFactorAuth = () => {
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [factorId, setFactorId] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [verifyCode, setVerifyCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [challengeId, setChallengeId] = useState<string | null>(null)

  const enrollMFA = async () => {
    try {
      setIsEnrolling(true)
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      })
      
      if (error) throw error
      
      setFactorId(data.id)
      // Set QR code from the correct property path
      setQrCode(data.totp.qr_code)
    } catch (error) {
      console.error('Error enrolling in MFA:', error)
      toast({
        title: "Error enrolling in 2FA",
        description: "Please try again later",
        variant: "destructive"
      })
    } finally {
      setIsEnrolling(false)
    }
  }

  const verifyMFA = async () => {
    if (!factorId) return
    
    try {
      setIsVerifying(true)
      // First create a challenge
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({ factorId })
      if (challengeError) throw challengeError

      // Store the challenge ID
      const challengeId = challengeData.id
      setChallengeId(challengeId)

      // Then verify with both factorId and challengeId
      const { data, error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verifyCode,
      })

      if (verifyError) throw verifyError

      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled"
      })
    } catch (error) {
      console.error('Error verifying MFA:', error)
      toast({
        title: "Verification Failed",
        description: "Please check your code and try again",
        variant: "destructive"
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Secure your account with two-factor authentication
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!qrCode ? (
          <Button 
            onClick={enrollMFA} 
            disabled={isEnrolling}
            className="w-full"
          >
            {isEnrolling ? "Setting up..." : "Enable 2FA"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="text-sm">
              1. Scan this QR code with your authenticator app
              <img 
                src={qrCode} 
                alt="QR Code for 2FA" 
                className="mx-auto my-4"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                2. Enter the verification code from your authenticator app
              </div>
              <InputOTP
                maxLength={6}
                value={verifyCode}
                onChange={setVerifyCode}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        )}
      </CardContent>
      {qrCode && (
        <CardFooter>
          <Button 
            onClick={verifyMFA} 
            disabled={verifyCode.length !== 6 || isVerifying}
            className="w-full"
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
