
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { UserPlus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Gender is required",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  position: z.string().min(1, { message: "Position is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const AddStaffPage: React.FC = () => {
  const navigate = useNavigate();
  const { staffId } = useParams<{ staffId: string }>();
  const { staffList, setStaffList } = useAppContext();
  const isEditing = Boolean(staffId);

  // Find staff if we're editing
  const existingStaff = isEditing 
    ? staffList.find(staff => staff.id === staffId)
    : undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      gender: "Male" as "Male" | "Female",
      email: "",
      address: "",
      position: "",
      password: "",
    },
  });

  // Populate the form if editing existing staff
  useEffect(() => {
    if (existingStaff) {
      form.reset({
        id: existingStaff.id,
        name: existingStaff.name,
        gender: existingStaff.gender as "Male" | "Female",
        email: existingStaff.email,
        address: existingStaff.address,
        position: existingStaff.position,
        password: existingStaff.password,
      });
    }
  }, [existingStaff, form]);

  const onSubmit = (values: FormValues) => {
    if (isEditing) {
      // Update existing staff
      setStaffList(
        staffList.map(staff => 
          staff.id === staffId 
            ? { ...values, status: staff.status } 
            : staff
        )
      );
      toast.success("Staff updated successfully");
    } else {
      // Check if staff with this ID already exists
      if (staffList.some(staff => staff.id === values.id)) {
        toast.error("A staff member with this ID already exists");
        return;
      }

      // Add new staff member
      const newStaff = {
        ...values,
        status: 'active' as const,
      };

      setStaffList([...staffList, newStaff]);
      toast.success("Staff member added successfully");
    }
    
    navigate("/staff");
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center">
        {isEditing ? (
          <User className="h-6 w-6 text-primary mr-2" />
        ) : (
          <UserPlus className="h-6 w-6 text-primary mr-2" />
        )}
        <h1 className="text-2xl font-bold capitalize">
          {isEditing ? "Update Staff" : "Add Staff"}
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Staff Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">ID</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter staff ID" 
                          {...field} 
                          disabled={isEditing} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="capitalize">Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel className="capitalize">Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter complete address"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => navigate("/staff")}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Update Staff" : "Save Staff"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AddStaffPage;
